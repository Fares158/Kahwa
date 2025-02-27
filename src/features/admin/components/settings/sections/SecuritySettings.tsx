import React, { useState, useEffect } from 'react';
import { Save, Key, Lock } from 'lucide-react';
import { supabase } from '../../../../../lib/supabase/client';
import { toast } from 'react-hot-toast';
import { useAdmin } from '../../../../../contexts/AdminContext';

const SecuritySettings = () => {
  const { user } = useAdmin();
  const [settings, setSettings] = useState({
    sessionTimeout: 60,
    passwordMinLength: 8,
    passwordRequireSpecial: true
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Fetch settings from database
  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('admin_settings')
          .select('value')
          .eq('key', 'security')
          .single();
          
        if (error) throw error;
        
        if (data?.value) {
          setSettings({
            sessionTimeout: data.value.session_timeout || 60,
            passwordMinLength: data.value.password_min_length || 8,
            passwordRequireSpecial: data.value.require_special_chars || true
          });
        }
      } catch (error) {
        console.error('Error fetching security settings:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('admin_settings')
        .upsert({
          key: 'security',
          value: {
            session_timeout: settings.sessionTimeout,
            password_min_length: settings.passwordMinLength,
            require_special_chars: settings.passwordRequireSpecial
          }
        }, {
          onConflict: 'key'
        });
        
      if (error) throw error;
      
      toast.success('Security settings saved successfully');
    } catch (error) {
      console.error('Error saving security settings:', error);
      toast.error('Failed to save security settings');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to change your password');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < settings.passwordMinLength) {
      toast.error(`Password must be at least ${settings.passwordMinLength} characters`);
      return;
    }
    
    if (settings.passwordRequireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword)) {
      toast.error('Password must contain at least one special character');
      return;
    }
    
    try {
      setPasswordLoading(true);
      
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });
      
      if (error) throw error;
      
      toast.success('Password updated successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-8 bg-white rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Key className="w-5 h-5" />
            Security Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                className="input"
                min="15"
                max="480"
              />
              <p className="text-xs text-gray-500 mt-1">
                Time before an inactive session is automatically logged out
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Password Length
              </label>
              <input
                type="number"
                value={settings.passwordMinLength}
                onChange={(e) => setSettings(prev => ({ ...prev, passwordMinLength: parseInt(e.target.value) }))}
                className="input"
                min="8"
                max="32"
              />
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.passwordRequireSpecial}
                  onChange={(e) => setSettings(prev => ({ ...prev, passwordRequireSpecial: e.target.checked }))}
                />
                <span>Require Special Characters in Password</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit" 
            className="btn-primary flex items-center gap-2"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>

      <div className="border-t pt-6">
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Change Password
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
              className="input"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
              className="input"
              required
              minLength={settings.passwordMinLength}
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be at least {settings.passwordMinLength} characters
              {settings.passwordRequireSpecial && ' and include at least one special character'}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="input"
              required
            />
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="btn-primary flex items-center gap-2"
              disabled={passwordLoading}
            >
              {passwordLoading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecuritySettings;
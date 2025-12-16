import { StyleSheet, View, Text, StatusBar, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function AccountScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.title}>Profile</Text>

        {/* Profile header */}
        <View style={styles.profileRow}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Image
                source={require('@/assets/images/icon.png')}
                style={styles.avatarImage}
              />
            </View>
            <TouchableOpacity style={styles.avatarEdit}>
              <MaterialIcons name="edit" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.name}>Matt Murdock</Text>
            <Text style={styles.email}>imnotdaredevil@mail.com</Text>
          </View>
        </View>

        {/* Account section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ACCOUNT</Text>
          {[
            { label: 'Personal info', icon: 'person-outline' },
            { label: 'Payment methods', icon: 'credit-card' },
            { label: 'Privacy & Security', icon: 'lock-outline' },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.row}>
              <View style={styles.rowLeft}>
                <View style={styles.rowIcon}>
                  <MaterialIcons name={item.icon as any} size={20} color="#0D1634" />
                </View>
                <Text style={styles.rowText}>{item.label}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#BDBDBD" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SETTINGS</Text>
          {[
            { label: 'Notification', icon: 'notifications-none' },
            { label: 'Appearance', icon: 'color-lens' },
            { label: 'Review', icon: 'star-outline' },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.row}>
              <View style={styles.rowLeft}>
                <View style={styles.rowIcon}>
                  <MaterialIcons name={item.icon as any} size={20} color="#0D1634" />
                </View>
                <Text style={styles.rowText}>{item.label}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#BDBDBD" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Support section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SUPPORT</Text>
          {[
            { label: 'Help & Support', icon: 'help-outline' },
            { label: 'Terms & Conditions', icon: 'description' },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.row}>
              <View style={styles.rowLeft}>
                <View style={styles.rowIcon}>
                  <MaterialIcons name={item.icon as any} size={20} color="#0D1634" />
                </View>
                <Text style={styles.rowText}>{item.label}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#BDBDBD" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutRow}>
          <Text style={styles.logoutText}>Log Out</Text>
          <MaterialIcons name="chevron-right" size={20} color="#FF5A5F" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0D1634',
    marginBottom: 24,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  avatarWrapper: {
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F0F0F0',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  avatarEdit: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0D1634',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileText: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0D1634',
  },
  email: {
    fontSize: 14,
    color: '#9E9E9E',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 12,
    color: '#9E9E9E',
    marginBottom: 12,
    letterSpacing: 1,
    fontWeight: '700',
    marginLeft: 4,
  },
  row: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowText: {
    fontSize: 15,
    color: '#0D1634',
    fontWeight: '600',
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFF0F0',
    borderRadius: 16,
    marginTop: 10,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF5A5F',
    fontWeight: '700',
  },
});

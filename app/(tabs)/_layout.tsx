import { Tabs } from 'expo-router/tabs';
export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
            title: 'Home',
            tabBarLabelStyle: { fontSize: 15},
        }}
      />
      <Tabs.Screen name='search'  />
    </Tabs>
  );
}
import React, { useEffect, useState } from 'react';
import { DesktopOutlined, UserOutlined, LaptopOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, MenuProps } from 'antd';
import { useRouter } from 'hooks/useRouter';
import { Outlet } from 'react-router-dom';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem({
  label,
  key,
  icon,
  children,
  path,
}: {
  label: React.ReactNode;
  key?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  path?: string;
}): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    path,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem({
    label: 'Trang chủ',
    key: '1',
    icon: <DesktopOutlined />,
  }),
  getItem({
    label: 'Chuyển khoản',
    icon: <LaptopOutlined />,
    key: 'sub1',
    children: [
      getItem({ label: 'Nội bộ', key: '2' }),
      getItem({ label: 'Liên ngân hàng', key: '3' }),
    ],
  }),
  getItem({
    label: 'Cá nhân',
    key: '4',
    icon: <UserOutlined />,
  }),
];

const LayoutContainer = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();

  const keyPath = (value: string) => {
    switch (value) {
      case '/home':
        return '1';
      case '/send-private':
        return '2';
      case '/send-public':
        return '3';
      case '/account':
        return '4';
      default:
        return '1';
    }
  };

  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  useEffect(() => {
    setSelectedItem([keyPath(router.location.pathname)]);
  }, [router.location]);

  const onClickMenu = (item: any) => {
    switch (item.key) {
      case '1':
        router.push('/home');
        return;
      case '2':
        router.push('/send-private');
        return;
      case '3':
        router.push('/send-public');
        return;
      case '4':
        router.push('/account');
        return;
      default:
        router.push('/home');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div
          style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }}
          className="flex justify-center items-center text-white font-bold text-lg \ rounded-lg"
        >
          Bank LTW
        </div>
        <Menu
          onClick={onClickMenu}
          theme="dark"
          selectedKeys={selectedItem}
          defaultSelectedKeys={[items[0]?.key as string]}
          mode="inline"
          items={items}
        ></Menu>
      </Sider>
      <Layout className="site-layout" hasSider={false}>
        <Content style={{ margin: '20px' }}>
          <div
            style={{
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: '10px',
            }}
            className="h-full overflow-auto"
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutContainer;
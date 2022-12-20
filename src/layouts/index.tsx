import React, { useEffect, useState } from 'react';
import { DesktopOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, MenuProps } from 'antd';
import { useRouter } from 'hooks/useRouter';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem({
  label,
  key,
  icon,
  children,
}: {
  label: React.ReactNode;
  key: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem({ label: 'Trang chủ', key: '/home', icon: <DesktopOutlined /> }),
  getItem({ label: 'Cá Nhân', key: '/account', icon: <UserOutlined /> }),
];

const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  useEffect(() => {
    setSelectedItem([router.location.pathname]);
  }, [router.location]);

  const onClickMenu = (item: any) => {
    const itemSelected = items.find((_item) => _item?.key === item.key);
    router.push(itemSelected?.key as string);
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
        />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '20px' }}>
          <div
            style={{
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: '10px',
            }}
            className="h-full overflow-auto"
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutContainer;

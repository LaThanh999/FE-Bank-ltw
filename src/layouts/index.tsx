import React, { useEffect, useState } from 'react';
import { DesktopOutlined, UserOutlined, LaptopOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, MenuProps } from 'antd';
import { useRouter } from 'hooks/useRouter';
import { Outlet } from 'react-router-dom';
import { TYPE, USER_TYPE } from 'constants/common';

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
    label: 'Nhắc nợ',
    key: '',
    icon: <DesktopOutlined />,
    children: [
      getItem({ label: 'Danh sách', key: '4' }),
      getItem({ label: 'Chưa thanh toán', key: '5' }),
    ],
  }),
  getItem({
    label: 'Cá nhân',
    key: '6',
    icon: <UserOutlined />,
  }),
];

const itemsEmployee: MenuItem[] = [
  getItem({
    label: 'Trang chủ',
    key: 'employee-1',
    icon: <DesktopOutlined />,
  }),
  getItem({
    label: 'Khách hàng',
    key: 'sub-employee-1',
    icon: <LaptopOutlined />,
    children: [
      getItem({ label: 'Chi tiết', key: 'employee-2' }),
      getItem({ label: 'Nạp tiền', key: 'employee-3' }),
      getItem({ label: 'Thêm khách hàng', key: 'employee-4' }),
    ],
  }),
];

const LayoutContainer = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();
  const typeUser = localStorage.getItem(TYPE);

  const keyPath = (value: string) => {
    switch (value) {
      case '/home':
        return '1';
      case '/send-private':
        return '2';
      case '/send-public':
        return '3';
      case '/owe':
        return '4';
      case '/my-owe':
        return '5';
      case '/account':
        return '6';
      default:
        return '1';
    }
  };

  const keyPathEmployee = (value: string) => {
    switch (value) {
      case '/home-employee':
        return 'employee-1';
      case '/customer-detail':
        return 'employee-2';
      case '/recharge-money':
        return 'employee-3';
      case '/add-customer':
        return 'employee-4';
      default:
        return 'employee-1';
    }
  };

  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [selectedItemEmployee, setSelectedItemEmployee] = useState<string[]>([]);

  useEffect(() => {
    setSelectedItem([keyPath(router.location.pathname)]);
    setSelectedItemEmployee([keyPathEmployee(router.location.pathname)]);
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
        router.push('/owe');
        return;
      case '5':
        router.push('/my-owe');
        return;
      case '6':
        router.push('/account');
        return;
      default:
        router.push('/home');
    }
  };

  const onClickMenuEmployee = (item: any) => {
    switch (item.key) {
      case 'employee-1':
        router.push('/home-employee');
        return;
      case 'employee-2':
        router.push('/customer-detail');
        return;
      case 'employee-3':
        router.push('/recharge-money');
        return;
      case 'employee-4':
        router.push('/add-customer');
        return;
      default:
        router.push('/home-employee');
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
        {Number(typeUser) === USER_TYPE.customer && (
          <Menu
            onClick={onClickMenu}
            theme="dark"
            selectedKeys={selectedItem}
            defaultSelectedKeys={[items[0]?.key as string]}
            mode="inline"
            items={items}
          ></Menu>
        )}
        {Number(typeUser) === USER_TYPE.employee && (
          <Menu
            onClick={onClickMenuEmployee}
            theme="dark"
            selectedKeys={selectedItemEmployee}
            defaultSelectedKeys={[itemsEmployee[0]?.key as string]}
            mode="inline"
            items={itemsEmployee}
          ></Menu>
        )}
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

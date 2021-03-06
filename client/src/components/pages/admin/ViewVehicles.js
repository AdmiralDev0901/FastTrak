import React, { useEffect, Fragment } from 'react'
import 'antd/dist/antd.css';
import { Layout, Icon, PageHeader } from 'antd';
import SideBar from "../../layout/admin/Sidebar"
import AdminNavbar from '../../layout/admin/AdminNavbar'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getVehicles } from '../../../actions/vehicles'
import Alert from '../../layout/ui/Alert'
import { Table, Divider, Tag } from 'antd';
// const { Content, Footer, Sider } = Layout;
const { Content, Footer, Sider } = Layout;


//Render the columns for the table

const columns = [
    {
        title: 'Vin Number',
        dataIndex: 'vinNumber',
        key: 'vinNumber',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Brand ID',
        dataIndex: 'brandId',
        key: 'brandId',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <span>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
                <a>Edit Vehicle {record.name}</a>
                <Divider type="vertical" />
                <a>Delete</a>
            </span>
        ),
    },
];



const ViewVehicles = ({ getVehicles, auth: { user }, vehicles: { vehicles, loading } }) => {

    // call our redux action 
    useEffect(() => {
        getVehicles();
    }, [])

    //make a mapped component from the data we got back
    const getvehicleList = vehicles.map((vehicle) => {

        return {
            key: vehicle.brandId,
            brandId: vehicle.brandId,
            vinNumber: vehicle.vinNumber,
            price: vehicle.price,
            tags: ['Web Visible']
        }
    })





    //pass the prop to sidebar
    const activeLink = 2;

    return (

        <Layout style={{ minHeight: '100vh' }}>
            <SideBar activeLink={activeLink} />
            <Layout>
                <AdminNavbar />
                <Content style={{ margin: '20px 16px' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Alert />
                        <Fragment>
                            <div>
                                <PageHeader
                                    ghost={false}
                                    onBack={() => window.history.back()}
                                    title="View Inventory"
                                    subTitle="VView all the cars in your inventory" />
                                <p>Welcome {user ? user.name : <Icon type="loading" />}</p>
                                <Table columns={columns} dataSource={getvehicleList} />
                            </div>
                        </Fragment>



                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>




    )
}
ViewVehicles.propTypes = {
    getVehicles: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    vehicles: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    vehicles: state.vehicles
})
export default connect(mapStateToProps, { getVehicles })(ViewVehicles)
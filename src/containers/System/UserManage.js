import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService } from '../../services/userService'
import ModalUser from './ModalUser';
class UserManage extends Component {
    //properties; nested 
    //tao bien muon dung voi class
    //data cua props lay tu state cua thg cha
    //data cua thg cha se lay data tu API
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false, //mac dinh se ko mo modal
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }
    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                //setState cap nhat stated la bat dong bo
                //re-render
                arrUsers: response.users
            })
        }

    }


    hadleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })

    } //onechange, onclick,.. dung array func

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        let arrUsers = this.state.arrUsers;
        console.log('checkk', arrUsers);

        return (
            <div className='users-container'>
                <ModalUser
                    createNewUser={this.createNewUser}
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                />
                <div className='title text-center'> Manage users </div>
                <div className='mx-1'>
                    <button
                        onClick={() => this.hadleAddNewUser()}
                        className='btn btn-primary px-3'><i className='fas fa-plus'></i>Add new user</button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    {/* mt-margin top, mx- margin right-left */}
                    <table id='customers'>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>

                            {/* de dung vong lap thi bat dau bang dau {}, de ham chay dc phai return */}
                            {arrUsers && arrUsers.map((item, index) => {
                                // console.log('check map', item, index)
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'><i className='fas fa-pencil-alt'></i> </button>
                                            <button className='btn-delete'><i className='fas fa-trash'></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

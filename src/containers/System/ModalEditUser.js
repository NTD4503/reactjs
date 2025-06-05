import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _, { last } from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',

        }

    }


    componentDidMount() {
        let user = this.props.currentUser;
        //check user co rong hay khong !_.isEmpty(user)
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
        // let {currentUser} = this.props;
        console.log('didmout edit modal', this.props.currentUser)
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChageInput = (event, id) => {
        //bad code
        // this.state[id] = event.target.value; ko dc modify truc tiep state
        // this.setState({
        //     ...this.state
        // ... de copy
        // })
        let copyState = { ...this.state };
        copyState[id] = event.target.value; //lay gia tri
        this.setState({ //cap nhat state
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter:' + arrInput[i]);
                break;
            }

        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //call api edit user
            this.props.editUser(this.state);
        }
    }



    render() {
        console.log('check props from current', this.props)
        return (
            //toggle click ra ngoai se dong lai
            <Modal
                size='lg'

                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}>
                <ModalHeader toggle={() => { this.toggle() }}>
                    Edit users
                </ModalHeader>
                <ModalBody>

                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                onChange={(event) => { this.handleOnChageInput(event, 'email') }}
                                disabled
                                value={this.state.email}
                                type='text'>

                            </input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input
                                onChange={(event) => { this.handleOnChageInput(event, 'password') }}
                                value={this.state.password}
                                disabled
                                type='password'></input>
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input
                                onChange={(event) => { this.handleOnChageInput(event, 'firstName') }}
                                value={this.state.firstName}
                                type='text'></input>
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input
                                onChange={(event) => { this.handleOnChageInput(event, 'lastName') }}
                                value={this.state.lastName}
                                type='text'></input>
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input
                                onChange={(event) => { this.handleOnChageInput(event, 'address') }}
                                value={this.state.address}
                                type='text'></input>
                        </div>

                    </div>



                </ModalBody>
                <ModalFooter>
                    <Button

                        className='px-3' color="primary"
                        onClick={() => { this.handleSaveUser() }}>
                        Save changes
                    </Button>{' '}
                    <Button className='px-3' color="secondary" onClick={() => { this.toggle() }}>
                        close
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);

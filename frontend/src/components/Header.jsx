

import './Header.scss';

import AdminNavbar from './AdminNavbar';
import { useSelector } from 'react-redux';
import DoctorNavbar from './DoctorNavbar';
import {memo} from 'react';
import { ROLES_LIST } from '../utils/roles_list';



const Header = () => {
    
    const userRole = useSelector((state) => state.auth.userInfo.roles);

   
    

    if(userRole===ROLES_LIST.Amdin){
        return (
        
            <header>
                    
                <AdminNavbar/>
    
            </header>
        )

    }
    if(userRole===ROLES_LIST.Doctor){
        return (
        
            <header>
                    
                <DoctorNavbar/>
    
            </header>
        )
    }
    

}

export default memo(Header);
import './Home.css';
import Button from "../../Button/Button";
import Navigation from "../../navigation/Navigation";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Chat from '../../chat/Chat';

export interface Inventory {
    _id: Object;
    inventoryId: number;
    inventoryName: string;
    inventoryDate: string;
}

export default function Home() {
    let { id } = useParams();
    const [inventory, setInventory] = useState<Inventory[]>([]);
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setCurrentUser(parsedUser.username);
        }

        axios.get('http://localhost:3000/inventory')
            .then((inData) => {
                setInventory(inData.data);
            })
            .catch((error) => console.error("Error fetching inventory:", error));
    }, []);

    const deleteInventory = (inventoryId: any) => {
        axios.delete(`http://localhost:3000/inventory/${inventoryId}`)
            .then(() => {
                setInventory(inventory.filter(item => item._id !== inventoryId));
            })
            .catch((error) => console.error("Error deleting inventory:", error));
    };

    return (
        <>
            <div className='grid'>
                <div className='navigation'>
                    <Navigation />
                </div>
                <h1 className='title'>Inventory Details</h1>
                {currentUser &&
                    <div className='createButton'>
                        <Link to={`/inventory/create?username=${currentUser}`}>
                            <Button text="Create" backgroundColor='#084b83ff' color='#fbc3bcff' />
                        </Link>
                    </div>
                }
                {currentUser && <h2 className='textDesign'>Welcome {currentUser}</h2>}
                <table className='tableDesign'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Date</th>
                            {currentUser && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((tableData) => (
                            <tr key={tableData._id.toString()}>
                                <td>{tableData.inventoryId}</td>
                                <td>{tableData.inventoryName}</td>
                                <td>{tableData.inventoryDate}</td>
                                {currentUser && (
                                    <td>
                                        <Link to={`/inventory/update/${tableData._id}`}>
                                            <Button buttonType='button' text="Update" backgroundColor='#f3b61fff' color='#fbc3bcff' />
                                        </Link>
                                        <Button buttonType='button' text="Delete" backgroundColor='#15b097ff' color='#fbc3bcff' clickAction={() => deleteInventory(tableData._id)} />
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <section className="chatButton">
                    <Chat />
                </section>
            </div>
        </>
    );
}

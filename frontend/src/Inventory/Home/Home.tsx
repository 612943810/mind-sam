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
        <div className="container mx-auto p-6">
            <Navigation />
            <h1 className='text-2xl font-semibold text-center my-4'>Inventory Details</h1>
            {currentUser && (
                <div className='text-center mb-4'>
                    <Link to={`/inventory/create?username=${currentUser}`}>
                        <Button text="Create" backgroundColor='#084b83ff' color='#fbc3bcff' />
                    </Link>
                </div>
            )}
            {currentUser && <h2 className='text-center mb-4'>Welcome {currentUser}</h2>}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                    <thead className="bg-indigo-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Id</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Date</th>
                            {currentUser && <th className="px-4 py-2 text-left">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((tableData) => (
                            <tr key={tableData._id.toString()} className="border-t">
                                <td className="px-4 py-2">{tableData.inventoryId}</td>
                                <td className="px-4 py-2">{tableData.inventoryName}</td>
                                <td className="px-4 py-2">{tableData.inventoryDate}</td>
                                {currentUser && (
                                    <td className="px-4 py-2 space-x-2">
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
            </div>

            <div className="fixed bottom-6 left-6">
                <Chat />
            </div>
        </div>
    );
}

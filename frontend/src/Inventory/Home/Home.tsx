import Button from "../../Button/Button";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Chat from '../../chat/Chat';

const API_URL = import.meta.env.VITE_API_URL;

export interface Inventory {
    _id: any;
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

        axios.get(`${API_URL}/inventory`)
            .then((inData) => {
                setInventory(Array.isArray(inData.data) ? inData.data : []);
            })
            .catch((error) => console.error("Error fetching inventory:", error));
    }, []);

    const deleteInventory = (inventoryId: any) => {
        axios.delete(`${API_URL}/inventory/${inventoryId}`)
            .then(() => {
                setInventory(inventory.filter(item => item._id !== inventoryId));
            })
            .catch((error) => console.error("Error deleting inventory:", error));
    };

    return (
        <>
            <div className="container mx-auto p-6">

                <div className="flex items-center justify-between mb-4">
                    <h1 className='text-2xl font-semibold'>Inventory Details</h1>
                </div>

                {currentUser && (
                    <div className='text-center mb-4'>
                        <Link to={`/inventory/create?username=${currentUser}`}>
                            <Button text="Create" backgroundColor='#084b83ff' color='#fbc3bcff' />
                        </Link>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                        <thead className="bg-indigo-800 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium">Id</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                                {currentUser && <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.map((tableData, idx) => (
                                <tr key={tableData.inventoryId ?? idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50`}>
                                    <td className="px-4 py-2">{tableData.inventoryId}</td>
                                    <td className="px-4 py-2">{tableData.inventoryName}</td>
                                    <td className="px-4 py-2">{tableData.inventoryDate ? new Date(tableData.inventoryDate).toLocaleDateString() : ''}</td>
                                    {currentUser && (
                                        <td className="px-4 py-2">
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
        </>
    );
}

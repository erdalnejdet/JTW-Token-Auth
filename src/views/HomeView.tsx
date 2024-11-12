import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../store/auth";

const initialFormData = {
    title: "",
    estimate: 1,
    description: "",
    status: "2",
};

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state: any) => state.auth);
    const [data, setData] = useState([]);
    const [message, setMessage] = useState<string>("");
    const [messageType, setMessageType] = useState("");
    const [searchText, setSearchText] = useState('')
    const [isDone, setIsDone] = useState(false)

    const [statuses, setStatuses] = useState([])
    const [formData, setFormatData] = useState({ ...initialFormData });
    const getStatuses = async () => {
        try {
            const _res = await axios.get('http://localhost:3030/api/todo/statuses');
            setStatuses(_res.data);
        } catch (e: any) {
            if (e.response.status === 401) {
                localStorage.removeItem('user');
                dispatch(setToken(null as never));
                navigate('/login');
            }
        }
    }


    const handleDone = async (todo: any) => {
        const _res: any = await axios.put(`http://localhost:3030/api/todo/updateIsDone/${todo._id}`, {}, {
            headers: {
                'Authorization': `Bearer ${auth.user.token}`
            }
        });
        console.log('_res', _res)
    }

    const handleUpdate = (todo: any) => {
        setFormatData(
            {
                ...todo,
                status: statuses.find((item) => item.text === todo.status)
            }
        )
    }
    const getTodos = async (filter?: boolean) => {
        try {
            console.log(filter)
            const _res = await axios.get(`http://localhost:3030/api/todo?isDone=${filter || false}`, {
                headers: {
                    'Authorization': `Bearer ${auth.user.token}`
                }
            });
            setData(_res.data);
        } catch (e: any) {
            if (e.response.status === 401) {
                localStorage.removeItem('user');
                dispatch(setToken(null as never));
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        getTodos();
        getStatuses()
    }, []);



    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (formData._id) {
            const _status: any = statuses.find((item: any) => item.id.toString() === formData.status.toString())?.text || ''
            const _res: any = await axios.put(`http://localhost:3030/api/todo/${formData._id}`, {
                ...formData,
                status: _status
            }, {
                headers: {
                    'Authorization': `Bearer ${auth.user.token}`
                }
            });
            getTodos();
        } else {
            try {
                const _status: any = statuses.find((item: any) => item.id.toString() === formData.status.toString())?.text || ''
                const _res: any = await axios.post('http://localhost:3030/api/todo', {
                    ...formData,
                    status: _status
                }, {
                    headers: {
                        'Authorization': `Bearer ${auth.user.token}`
                    }
                });

                const arr = [...data];
                arr.push(_res.data as never);
                setData(arr);
                setFormatData({ ...initialFormData });
                setMessage("Todo başarıyla eklendi!");
                setMessageType("success");

            } catch (error) {
                console.error("An error occurred while submitting the form:", error);
                setMessage("Tüm Alanlar Zorunludur");
                setMessageType("error");
            }
        }

    };


    const handleDelete = async (todoId: string) => {
        try {
            await axios.delete(`http://localhost:3030/api/todo/${todoId}`, {
                headers: {
                    'Authorization': `Bearer ${auth.user.token}`
                }
            });
            setData(data.filter((todo: any) => todo._id !== todoId));
            alert("Kayıt silindi");
        } catch (error) {
            console.error("Silme işlemi sırasında bir hata oluştu:", error);
            alert("Hatalı işlem! Silme işlemi gerçekleştirilemedi.");
        }
    };


    const handleSearch = async () => { // XYREF01010
        try {
            //https://axios-http.com/docs/cancellation
            //throttle
            const _res = await axios.get(`http://localhost:3030/api/todo?isDone=${isDone}&title=${searchText}`, {
                headers: {
                    'Authorization': `Bearer ${auth.user.token}`
                }
            });
            setData(_res.data);
            console.log('_res', _res)
        } catch (error) {
            console.log('êrror', error)
        }


    return (
        <>
            <div className="p-8 w-full bg-gray-50 rounded-lg shadow-md">
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Task Form</h2>

                    {message && (
                        <div className={`text-center p-4 mb-4 ${messageType === "success" ? "text-green-500" : "text-red-500"}`}>
                            {message}
                        </div>
                    )}

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            value={formData.title}
                            onChange={(e) => { setFormatData({ ...formData, title: e.target.value }); }}
                            type="text"
                            name="title"
                            id="title"
                            className="block py-3 px-0 w-full text-base text-gray-900 bg-white border-b-2 border-gray-300 focus:border-blue-600 transition duration-300 ease-in-out focus:outline-none"
                            placeholder=" "

                        />
                        <label htmlFor="title" className="absolute text-base text-gray-500 transform -translate-y-6 scale-75 top-3 left-0 transition-all duration-300 ease-in-out peer-focus:left-0 peer-focus:text-blue-600 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">
                            Title
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="number"
                            name="estimate"
                            value={formData.estimate}
                            onChange={(e) => { setFormatData({ ...formData, estimate: +e.target.value }); }}
                            id="estimate"
                            className="block py-3 px-0 w-full text-base text-gray-900 bg-white border-b-2 border-gray-300 focus:border-blue-600 transition duration-300 ease-in-out focus:outline-none"
                            placeholder=" "

                        />
                        <label htmlFor="estimate" className="absolute text-base text-gray-500 transform -translate-y-6 scale-75 top-3 left-0 transition-all duration-300 ease-in-out peer-focus:left-0 peer-focus:text-blue-600 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">
                            Estimate
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="description" className="block mb-2 text-base font-medium text-gray-900">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => { setFormatData({ ...formData, description: e.target.value }); }}
                            id="description"
                            rows={4}
                            className="block p-3 w-full text-base text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                            placeholder="Leave a comment..."
                        >
                        </textarea>
                    </div>



                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Status</label>
                        <select key={formData.status} id="countries"
                            selected={formData.status}
                            value={formData.status}
                            onChange={(e) => { setFormatData({ ...formData, status: e.target.value }); }}
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            {statuses.filter((item: any) => item.id !== 1).map((item: any) => {
                                return (
                                    <option value={item.id}>{item.text}</option>
                                )
                            })}
                        </select>
                    </div>




                    <button type="submit" className="w-full py-3 text-base font-semibold text-white bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in-out rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300">
                        Submit
                    </button>
                </form>
            </div>

            <div className="container mx-auto mt-10">
                <div className="max-w-md mx-auto">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" value={searchText} onChange={(e) => { setSearchText(e.target.value) }} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search ..." />
                        <button type="submit" onClick={handleSearch} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                    </div>
                    {/* XYREF01010 */}
                </div>
                <div className="py-4 flex  gap-4 justify-between">
                    {/* */}

                    <div className="flex items-center gap-4">
                        <div className="cursor-pointer" onClick={() => {
                            setIsDone(true)
                            getTodos(true)
                        }}>Tamamlananlar</div>
                        {/*  XA123
                     XA456
                     XA789   
                tekrar tekrar olusur 
                onClick={()=>{
                    getTodos(true)
                }}
                */}
                        <div className="cursor-pointer" onClick={() => {
                            setIsDone(false)
                            getTodos(false)
                        }}>Bekleyenler</div>
                    </div>

                    <div className="flex items-center gap-4">
                        <h3 className="text-xl font-semibold">Toplam İşler: {totalTasks}</h3>
                        <h3 className="text-xl font-semibold text-green-500">Tamamlanan İşler: {completedTasks}</h3>
                    </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((todo: any) => (
                        <div key={todo._id} className="bg-white rounded-2xl border p-6 relative">
                            <span className="text-sm flex justify-end absolute right-10">{new Date(todo.createdAt).toLocaleString()}</span>
                            <h2 className="text-blue-500 text-3xl">{todo.title}</h2>
                            <p className="mt-4 text-2xl truncate ">des:{todo.description} </p>
                            <p className="mt-4 text-xl">Estimate: {todo.estimate} hours</p>
                            <p className="mt-4 text-lg">Status: {todo.status}</p>

                            <button onClick={() => handleDelete(todo._id)}
                                className="w-full mb-4 py-3 text-base font-semibold text-white bg-red-700 hover:bg-red-800 transition duration-300 ease-in-out rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300">
                                Sil
                            </button>

                            <button
                                onClick={() => {
                                    handleUpdate(todo)
                                }}
                                className="w-full py-3 text-base font-semibold text-white bg-purple-700 hover:bg-purple-800 transition duration-300 ease-in-out rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300">
                                Güncelle
                            </button>

                            <button
                                onClick={() => {
                                    handleDone(todo)
                                }}
                                className="w-full mt-4 py-3 text-base font-semibold text-white bg-green-700 hover:bg-green-800 transition duration-300 ease-in-out rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300">
                                Tamamlandı Olarak İşaretle
                            </button>
                        </div>
                    ))}


                </div>

            </div>
        </>
    );
};

export default Home;

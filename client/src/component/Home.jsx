import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa'; // ✅ Sahi se import karo (capital F)

const Home = () => {
   
    const [bookForm, setBookForm] = useState({
        BookName: "",
        BookTitle: "",
        BookAuthor: "",
        SellingPrice: "",
        PublishDate: ""
    });

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingBookId, setEditingBookId] = useState(null);

    const API_BASE_URL = 'http://localhost:5000/api/books';

    const handleChange = (e) => {
        setBookForm((prev) => {
            return {
                ...prev,
                [e.target.id]: e.target.value
            }
        });
    }

    // Add OR Update Book
    const handleSubmit = async () => {
        if (!bookForm.BookName || !bookForm.BookTitle || !bookForm.BookAuthor || 
            !bookForm.SellingPrice || !bookForm.PublishDate) {
            alert("Please fill all fields!");
            return;
        }

        try {
            setLoading(true);
           
            if (editingBookId) {
                // UPDATE mode
                await axios.put(`${API_BASE_URL}/update/${editingBookId}`, bookForm);
                alert("Book updated successfully!");
                setEditingBookId(null);
            } else {
                // ADD mode
                await axios.post(`${API_BASE_URL}/add`, bookForm);
                alert("Book added successfully!");
            }
            
            setBookForm({
                BookName: "",
                BookTitle: "",
                BookAuthor: "",
                SellingPrice: "",
                PublishDate: ""
            });
            await fetchAllBooks();
            
        } catch(err) {
            console.error("Error:", err);
            alert(err.response?.data?.message || "Failed to process request");
        } finally {
            setLoading(false);
        }
    }

    // Get All Books
    const fetchAllBooks = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/all`);
            console.log("Fetched books:", response.data);
            
            if (response.data.success) {
                setBooks(response.data.books);
            } else {
                setBooks([]);
            }
        } catch(err) {
            console.error("Error fetching books:", err);
            setBooks([]);
        }
    }

    // Delete Book
    const handleDelete = async (bookId) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            try {
                await axios.delete(`${API_BASE_URL}/delete/${bookId}`);
                alert("Book deleted successfully!");
                await fetchAllBooks();
            } catch(err) {
                console.error("Error deleting book:", err);
                alert("Failed to delete book");
            }
        }
    }

    // Edit button click - Form fill karo
    const handleEdit = (book) => {
        setEditingBookId(book._id);
        setBookForm({
            BookName: book.BookName,
            BookTitle: book.BookTitle,
            BookAuthor: book.BookAuthor,
            SellingPrice: book.SellingPrice,
            PublishDate: book.PublishDate.split('T')[0]
        });
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Cancel edit mode
    const handleCancelEdit = () => {
        setEditingBookId(null);
        setBookForm({
            BookName: "",
            BookTitle: "",
            BookAuthor: "",
            SellingPrice: "",
            PublishDate: ""
        });
    };

    // Load books on page load
    useEffect(() => {
        fetchAllBooks();
    }, []);

    return (
        <div className="w-full px-5 min-h-[calc(100vh-60px)]">    
            {/* Form Section */}
            <div className="w-full bg-white p-4 rounded-lg shadow mb-6">
                <h2 className="text-xl font-bold mb-4">
                    {editingBookId ? "✏️ Edit Book" : "📚 Add New Book"}
                </h2>
                <div className="w-full flex flex-wrap gap-3 my-4 items-end">
                    <div className="flex-1 min-w-[150px]">
                        <label htmlFor="BookName" className="block text-sm font-medium text-gray-700 mb-1">
                            Book Name *
                        </label>
                        <input 
                            type="text" 
                            id="BookName"
                            placeholder="Book Name" 
                            className="w-full h-9 border border-gray-300 rounded-md px-3 text-sm"
                            value={bookForm.BookName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex-1 min-w-[150px]">
                        <label htmlFor="BookTitle" className="block text-sm font-medium text-gray-700 mb-1">
                            Book Title *
                        </label>
                        <input 
                            type="text" 
                            id="BookTitle"
                            placeholder="Book Title" 
                            className="w-full h-9 border border-gray-300 rounded-md px-3 text-sm"
                            value={bookForm.BookTitle}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex-1 min-w-[150px]">
                        <label htmlFor="BookAuthor" className="block text-sm font-medium text-gray-700 mb-1">
                            Book Author *
                        </label>
                        <input 
                            type="text" 
                            id="BookAuthor"
                            placeholder="Book Author" 
                            className="w-full h-9 border border-gray-300 rounded-md px-3 text-sm"
                            value={bookForm.BookAuthor}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex-1 min-w-[150px]">
                        <label htmlFor="SellingPrice" className="block text-sm font-medium text-gray-700 mb-1">
                            Selling Price *
                        </label>
                        <input 
                            type="number" 
                            id="SellingPrice"
                            placeholder="Selling Price" 
                            className="w-full h-9 border border-gray-300 rounded-md px-3 text-sm"
                            value={bookForm.SellingPrice}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex-1 min-w-[150px]">
                        <label htmlFor="PublishDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Publish Date *
                        </label>
                        <input 
                            type="date" 
                            id="PublishDate"
                            className="w-full h-9 border border-gray-300 rounded-md px-3 text-sm"
                            value={bookForm.PublishDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Submit or Cancel buttons */}
                <div className="w-full flex justify-end gap-2">
                    {editingBookId && (
                        <button 
                            onClick={handleCancelEdit}
                            className="h-9 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                    <button 
                        onClick={handleSubmit}
                        className="h-9 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400"
                        disabled={loading}
                    >
                        {editingBookId ? (loading ? "Updating..." : "Update Book") : (loading ? "Adding..." : "Add Book")}
                    </button>
                </div>
            </div>
            
            {/* Table Section */}
            <div className="w-full mt-4">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">
                        Books List ({books.length} books found)
                    </h3>
                </div>
                
                <div className="w-full overflow-x-auto">
                    <table className="w-full bg-white divide-y divide-gray-200 shadow rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book Author</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Selling Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Publish Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {books.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                        📚 No books found. Add your first book!
                                    </td>
                                </tr>
                            ) : (
                                books.map((book) => (
                                    <tr key={book._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-900">{book.BookName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{book.BookTitle}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{book.BookAuthor}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">${book.SellingPrice}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {new Date(book.PublishDate).toLocaleDateString()}
                                        </td>
                                        {/* ✅ EDIT aur DELETE ICONS with functionality */}
                                        <td className="px-6 py-4 text-sm font-medium">
                                            {/* Edit Icon */}
                                            <button
                                                onClick={() => handleEdit(book)}
                                                className="text-blue-600 hover:text-blue-900 mr-4 transition duration-200"
                                                title="Edit Book"
                                            >
                                                <FaEdit className="inline-block text-lg" />
                                            </button>
                                            
                                            {/* Delete Icon */}
                                            <button
                                                onClick={() => handleDelete(book._id)}
                                                className="text-red-600 hover:text-red-900 transition duration-200"
                                                title="Delete Book"
                                            >
                                                <FaTrash className="inline-block text-lg" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Home;
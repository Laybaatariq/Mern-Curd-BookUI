const { Book } = require('../model/book.model');

const handleBookStoreController = async (req, res) => {
    try {
        const { BookName, BookTitle, BookAuthor, SellingPrice, PublishDate } = req.body;
        
        //  STEP 1: Validation FIRST (before creating object)
        if (!BookName || !BookTitle || !BookAuthor || !SellingPrice || !PublishDate) {
            return res.status(400).json({ 
                message: "All fields are required", 
                success: false 
            });
        }
        
        //  STEP 2: Create new book object
        const newBook = new Book({
            BookName,
            BookTitle,
            BookAuthor,
            SellingPrice,
            PublishDate: new Date(PublishDate) // Ensure it's Date object
        });
        
        // STEP 3: Save to MongoDB using Mongoose method
        const savedBook = await newBook.save();
        
        //  STEP 4: Console.log BEFORE return
        console.log("Book added successfully:", savedBook);
        
        // STEP 5: Send response
        return res.status(201).json({ 
            message: "Book added successfully", 
            success: true,
            book: savedBook 
        });
        
    } catch (error) {
        console.error(" Error in handleBookStoreController:", error);
        
        // Handle duplicate key or validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: error.message, 
                success: false 
            });
        }
        
        return res.status(500).json({ 
            message: "Internal server error", 
            success: false,
            error: error.message 
        });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        console.log(`📚 Found ${books.length} books in database`);
        res.status(200).json({ 
            success: true, 
            count: books.length, 
            books: books 
        });
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

const deleteBook = async (req,res) => {
    try {
        const bookId = req.params.id;

        const deletedBook = await Book.findByIdAndDelete(bookId);

        if(!deleteBook)
        {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            }
            );
        }

        console.log("Book deleted:",deletedBook.BookName);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully"
        });
    } catch (error) {
        console.error("delete error:", error)
        res.status(500).json({
            success: false,
            message: error.meassage
        });
        
    }

};

const updateBook = async (req,res) => {
    try{
        const bookId = req.params.id;

        const { BookName, BookTitle, BookAuthor, SellingPrice, PublishDate } = req.body;
         
        const updateBook = await Book.findByIdAndUpdate(
            bookId,   // kunsi book update krni hai
            {
                BookName,
                BookTitle,
                BookAuthor,
                SellingPrice,
                PublishDate: new Date(PublishDate)
            },
            {
                new: true,
                runValidators: true
            }
        );

        if(!updateBook){
            return re.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        console.log("Book updated:",updateBook.BookName)
        res.status(200).json({
            success: true,
            message: "Book updated Successfully",
            book: updatedBook
        });

    }catch(error){
        console.error("Update error:", error)
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
    
};

module.exports = { handleBookStoreController, getAllBooks, deleteBook, updateBook};
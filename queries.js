// 1. Queristo find books in specific genres (e.g., "Dystopian")
db.books.find({ genre: "Dystopian" })

// 2. Find books published after a certain year (e.g., after 2000)
db.books.find({ published_year: { $gt: 2000 } })

// 3. Find books by a specific author (e.g., "Paul Schneider")
db.books.find({ author: "Paul Schneider" })

// 4. Update the price of a specific book (e.g., "Wuthering Heights")
db.books.updateOne(
  { title: "Wuthering Heights" },
  { $set: { price: 14.99 } }
)

// 5. Delete a book by it's title (e.g., "The Catcher in the Rye")
db.books.deleteOne({ title: "The Catcher in the Rye" })



// ADVANCED QUERIES
// 1. A query to find books that are both in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})

// 2. Use projection to return only the title, author, and price fields in your queries
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
)

// 3. Implement sorting to display books by price (both ascending and descending)
db.books.find({}).sort({ price: 1 }) // Ascending order
db.books.find({}).sort({ price: -1 }) // Descending order

// 4. Use the limit and skip methods to implement pagination (5 books per page)
db.books.find({}).skip(0).limit(5) // First page
db.books.find({}).skip(5).limit(5) // Second page



// AGGREGATION PIPELINES
// 1. Calculate the average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
]);

// 2. Find the author with the most books in the collection
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// 3.  Groups books by publication decade and counts them
db.books.aggregate([
  { $group: { _id: { $floor: { $divide: ["$published_year", 10] } }, count: { $sum: 1 } } }
]);



// INDEXING
// 1. Create an index on the title field for faster searches
db.books.createIndex({ title: 1 });

// 2. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// 3. Use the explain() method to demonstrate the performance improvement with your indexes
db.books.find({ title: "Wuthering Heights" }).explain("executionStats");
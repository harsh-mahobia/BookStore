import { AppError } from "../middlewares/error_handler";

const error_code = 400

export default (data: any, isUpdate = false) => {
    const { title, author, category, price, rating, publishedDate } = data;
    if (!isUpdate) {
      if (!title || !author || !category || price == null || rating == null || !publishedDate) {
        throw new AppError("All fields are required", error_code);
      }
    }
    if (title && typeof title !== "string") 
        throw new AppError("Title must be a string", error_code)

    if (author && typeof author !== "string") 
        throw new AppError("Author must be a string ", error_code);

    if (category && typeof category !== "string") 
        throw new AppError("Category must e a string", error_code)

    if (price !== undefined && (typeof price !== "number" || price < 0))
        throw new AppError("Price must be a postive number", error_code)

    if (rating !== undefined && (typeof rating !== "number" || rating < 0 || rating > 5))
        throw new AppError("Rating must be btween 0, 5", error_code);
  };
  
import Menu from "../models/menu.model.js";

export const addMenuItem = async (req, res) => {
    const { name, description, price, category } = req.body;
    const image = req.file.path;

    try {
        const menuItemExists = await Menu.findOne({ name });
        if (menuItemExists) {
            res.json({ success: false, message: "Item with same name is already exists." })
        }
        const menuItem = await Menu.create({
            name, description, price: parseInt(price), category, image
        })

        res.json({ success: true, message: "Item added successfully", menuItem });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getMenuItems = async (req, res) => {
    const menuItems = await Menu.find();
    res.json({ success: true, message: "Items fetched successfully", menuItems });
}

export const deleteMenuItem = async (req, res) => {
    const { itemId } = req.body;
    const menuItem = await Menu.findOneAndDelete({ _id: itemId });
    res.json({ success: true, message: "Item deleted successfully" })
}
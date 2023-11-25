import ItemModel from "../models/Item.js";


export const getLastThemes = async(req, res) =>{
    try{
        const items = await ItemModel.find().limit(5).exec();

        const themes = items.map(obj => obj.themes).flat().slice(0, 5)

        res.json(items);
    }catch(err) {
        console.log(err)
        res.status(500).json({
            message: "Failed to get an all items"
    });
}
}

export const getAll = async(req, res) =>{
    try{
        const items = await ItemModel.find().populate('user').exec();

        res.json(items);
    }catch(err) {
        console.log(err)
        res.status(500).json({
            message: "Failed to get an all items"
    });
}
}


export const getOne = async (req, res) => {
    try {
        const itemId = req.params.id;

        const doc = await ItemModel.findOneAndUpdate(
            {
                 _id: itemId 
            },
            { 
                $inc: { viewsCount: 1 } 
            },
            {
               returnDocument: 'after'
            },
            (err, doc) =>{
                if(err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Item not found',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Item not found',
                    });
                }
                res.json(doc);
            },
        ).populate('user');
            } catch (err) {
            console.error(err);
                res.status(500).json({
                    message: 'Failed to fetch an item',
                });
        }
    }


export const remove = async (req, res) => {
    try {
        const itemId = req.params.id;

        const deletedItem = await ItemModel.findByIdAndDelete(itemId);

        if (!deletedItem) {
            return res.status(404).json({
                message: 'Item not found',
            });
        }

        res.json({
            message: 'Item deleted successfully',
            deletedItem,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to delete item',
        });
    }
};


export const create = async(req, res) =>{
    try{
        const doc = new ItemModel({
            title: req.body.title,
            description: req.body.description,
            themes: req.body.themes.split(','),
            imageUrl: req.body.imageUrl,
            user : req.userId,
        })

        const item = await doc.save()
        res.json(item)
    }catch(err) {
        console.log(err)
        res.status(500).json({
            message: "Failed to create item"
    });
}
}

export const update = async (req, res)=>{
    try{
        const itemId = req.params.id;

    await ItemModel.updateOne({
        _id: itemId,
    },
    {
        title: req.body.title,
        description: req.body.description,
        themes: req.body.themes,
        user: req.userId,
        imageUrl: req.body.imageUrl,  
    });
    res.json({
        success: true,
    })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "Failed to update an item"
        })
    }
}
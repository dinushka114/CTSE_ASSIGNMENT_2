const ProductsRepository = require("../database/repository/products.repository");

// Product Service APIs
class ProductService{
    constructor(){
        this.repository = new ProductsRepository();
    }

    async GetProducts(){
        try {
            let products = await this.repository.GetProducts();

            if(products){
                return { success: true, products };
            }else{
                return { success: false, products:null };
            }

        } catch (error) {
            throw error;
        }
    }

    async AddNewProduct(userInputs){
        try{

            let product = await this.repository.CreateProduct(userInputs);

            if(product){
                return { success: true, message: "Product created successfully." };
            }else{
                return { success: false, message: "Something went wrong" };
            }

        }catch(err){
            throw err;
        }
    }

    async UpdateProduct(userInputs, id){
        try{

            let product = await this.repository.UpdateProduct({...userInputs, id});

            return { success: true, message: "Product update successfully." };
        }catch(err){
            throw err;
        }
    }

}

module.exports = ProductService;
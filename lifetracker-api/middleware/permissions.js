const Nutrition = require("../models/nutrition")
const { BadRequestError, ForbiddenError } = require("../utils/errors")


const authedUserOwnsNutrition = async (req, res, next) => {

    try {
        const { user } = res.locals
        const { nutritionId } = req.params
        const nutrition = await Nutrition.fetchNutritionById(nutritionId)
    
        if(nutrition.userEmail !== user.email){
            throw new ForbiddenError("User is not allowed to update other users' posts.")
        }

        res.locals.nutrition = nutrition

        return next()
    } catch(err) {
        return next(err)
    }

}

const authedUserOwnsNutritions = async (req, res, next) => {
    try{
        const {user} = res.locals
        const nutritions = await Nutrition.listNutritionForUser(user)
        

        if (nutritions[0].userEmail != user.email){
            throw new ForbiddenError("Forbidden access")
        }

        res.locals.nutritions = nutritions

        return next()
    }catch(err){
        return next(err)
    }
}

module.exports = {
    authedUserOwnsNutrition,
    authedUserOwnsNutritions
}
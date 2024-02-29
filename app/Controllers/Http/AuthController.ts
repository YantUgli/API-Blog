import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
    async register({auth, request, response}:HttpContextContract) {
        // get value from form
        const {email, password}= request.body()
        try {
            // create user
            const user = await User.create({
                email,
                password
            })

            // get token and authenticate the user
            const token = await auth.use('api').attempt(email, password)
            
            // return detail object user and
            // return token
            return {
                user,
                token
            }
        } catch (error) {
            return response.unauthorized('Invalid Credentials')
        }
    }

    async login({auth, request, response}:HttpContextContract) {
         // get value from form
         const {email, password}= request.body()
         try {
             // get token and authenticate the user
             const token = await auth.use('api').attempt(email, password)
             
             // return detail object user and
             return token
         } catch (error) {
             return response.unauthorized('Invalid Credentials')
         }
    }
}

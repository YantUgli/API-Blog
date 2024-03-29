import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  async index() {
    return await Category.all()
  }

  async store({ request }: HttpContextContract) {
    const data = request.body()

    const category = await Category.create(data)

    return category
  }
}

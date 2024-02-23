import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class PostsController {
  async index() {
    return await Post.query().preload('category')
    // return await Post.all()
  }

  async store({ request }: HttpContextContract) {

    const newPostData = schema.create({
      title: schema.string(),
      categoryId: schema.number.optional()
    })
    const data = await request.validate({schema: newPostData})


    const post = await Post.create(data)

    return post
  }
}

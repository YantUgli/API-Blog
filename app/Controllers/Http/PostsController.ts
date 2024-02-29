import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class PostsController {
  async index() {
    return await Post.query().preload('category')
    // return await Post.all()
  }

  async create() {
    
  }

  async store({ request }: HttpContextContract) {
    const newPostData = schema.create({
      title: schema.string(),
      categoryId: schema.number.optional(),
      slug: schema.string.optional([rules.unique({ table: 'posts', column: 'slug' })]),
    })
    const dataBody = request.body()
    const slug = this.generateSlug(dataBody.title)
    dataBody.slug = slug
    console.log(request)

    const data = await request.validate({
      schema: newPostData,
      data: dataBody,
      messages: {
        required: 'The {{ field }} is {{rule}} to create a post ',
      },
    })

    const post = await Post.create(data)

    return post
  }

  async show() {
    
  }
  
  async edit() {
    
  }

  async update() {
    
  }

  async destroy() {
    
  }

  // Fungsi untuk mengubah title menjadi slug
  private generateSlug(title: string): string {
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, '-') // Mengganti spasi dengan tanda strip
      .replace(/[^\w\-]+/g, '') // Menghapus karakter non-word dan non-dash
    return slug
  }
}

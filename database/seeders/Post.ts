import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Post from 'App/Models/Post'

export default class extends BaseSeeder {
  public static environment = ['development']
  public async run() {
    // Write your database queries inside the run method
    await Post.createMany([
      {
        title: 'Post ke 4',
      },
      {
        title: 'Post ke 5',
      },
      {
        title: 'Post ke 6',
      },
      {
        title: 'Post ke 7',
      },
    ])
  }
}

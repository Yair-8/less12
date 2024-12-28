import TypesDBService from '../models/type/TypesDBService.mjs'

class TypeController {
  static async getList(req, res) {
    try {
      const filters = {}
      for (const key in req.query) {
        if (req.query[key]) filters[key] = req.query[key]
      }

      const dataList = await TypesDBService.getList(filters)
      res.status(200).json({
        data: dataList,
        user: req.user,
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async getById(req, res) {
    try {
      const id = req.params.id

      let item = null
      if (id) {
        item = await TypesDBService.getById(id)
      }

      res.status(200).json({
        data: item,
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async register(req, res) {
    try {
      const { title } = req.body
      const dataObj = { title }

      if (req.params.id) {
        // Оновлюємо дані про користувача в базі даних
        await TypesDBService.update(req.params.id, dataObj)
        res.json({ success: true })
      } else {
        // Додаємо користувача в базу даних
        await TypesDBService.create(dataObj)
        res.json({ success: true })
      }
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: 'Failed to update user type' })
    }
  }

  static async delete(req, res) {
    try {
      await TypesDBService.deleteById(req.body.id)
      res.json({ success: true })
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Failed to delete user type' })
    }
  }
}

export default TypeController

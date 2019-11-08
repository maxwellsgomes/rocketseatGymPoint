import * as Yup from 'yup';
import Students from '../models/Students';

class StudentsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .required()
        .positive(),
      weight: Yup.number()
        .required()
        .positive(),
      height: Yup.number()
        .required()
        .positive(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails!' });
    }

    const studentExists = await Students.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(401).json({ error: 'Student already exists!' });
    }

    const { id, name, email, age, weight, height } = await Students.create(
      req.body
    );

    return res.json({
      user: {
        id,
        name,
        email,
        age,
        weight,
        height,
      },
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number()
        .positive()
        .integer(),
      weight: Yup.number().positive(),
      height: Yup.number().positive(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails!' });
    }
    const { email } = req.body;

    const student = await Students.findOne({ where: { email } });

    if (!student) {
      return res.status(401).json({ error: 'Student does not exists.' });
    }
    const { name, age, weight, height } = await student.update(req.body);

    return res.json({
      student: {
        name,
        email,
        age,
        weight,
        height,
      },
    });
  }
}

export default new StudentsController();

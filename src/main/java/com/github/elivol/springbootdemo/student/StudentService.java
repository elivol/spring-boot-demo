package com.github.elivol.springbootdemo.student;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

import com.github.elivol.springbootdemo.exception.StudentNotFoundException;
import com.github.elivol.springbootdemo.exception.BadRequestException;

@AllArgsConstructor
@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> allStudents() {
        return studentRepository.findAll();
    }

    public void addStudent(Student student) {
        String studentEmail = student.getEmail().trim();
        boolean emailExists = studentRepository.existsWithEmail(studentEmail);
        if (emailExists) {
            throw new BadRequestException(
                    String.format(Locale.ROOT,"Student with email %s is already exists", studentEmail));
        }

        studentRepository.save(student);
    }

    public void editStudent(Student student) {
        boolean emailExists = studentRepository.existsWithEmail(student.getEmail());
        if (emailExists) {
            throw new BadRequestException(
                    String.format(Locale.ROOT,"Student with email %s is already exists", student.getEmail()));
        }
        Student editedStudent = studentRepository.getById(student.getId());
        editedStudent.setName(student.getName());
        editedStudent.setEmail(student.getEmail());
        editedStudent.setGender(student.getGender());
        studentRepository.save(editedStudent);
    }

    public void deleteStudent(Long studentId) {
        boolean exists = studentRepository.existsById(studentId);
        if (!exists) {
            throw new StudentNotFoundException(
                String.format(Locale.ROOT, "Student with id %d does not exist", studentId));
        }

        studentRepository.deleteById(studentId);
    }

    public void deleteAllStudents() {
        studentRepository.deleteAll();
    }
}

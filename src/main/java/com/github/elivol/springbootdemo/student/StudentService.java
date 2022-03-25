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

    public void deleteStudent(Long studentId) {
        boolean exists = studentRepository.existsById(studentId);
        if (!exists) {
            throw new StudentNotFoundException(
                String.format(Locale.ROOT, "Student with id %d does not exist", studentId));
        }

        studentRepository.deleteById(studentId);
    }
}

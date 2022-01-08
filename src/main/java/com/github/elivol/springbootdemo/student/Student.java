package com.github.elivol.springbootdemo.student;

import lombok.*;

//@Getter
//@Setter
//@EqualsAndHashCode
//@ToString
//@NoArgsConstructor
//@AllArgsConstructor
@Data
public class Student {
    private Long id;
    private String name;
    private String email;
    private Gender gender;
}

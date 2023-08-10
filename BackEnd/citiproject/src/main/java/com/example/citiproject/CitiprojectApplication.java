package com.example.citiproject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.citiproject.repository.TransactionRepository;

@SpringBootApplication
public class CitiprojectApplication implements CommandLineRunner {

	@Autowired
	TransactionRepository transactionRepository;

	public static void main(String[] args) {
		SpringApplication.run(CitiprojectApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		transactionRepository.createTable();
	}

}

// System.out.println(transactionRepository.createDatabase());

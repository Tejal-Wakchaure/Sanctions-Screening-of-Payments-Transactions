package com.example.citiproject.service;

import java.io.InputStream;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.citiproject.entities.Transaction;

public interface TransactionService {

	public String sayhi();

	public boolean checkFormat(MultipartFile file);

	public boolean isAllColumnPresent(InputStream is);

	public String addTransaction(InputStream is, String fileName);

	public String sanctionScreening();

	public List<Transaction> getAllTransactions(String fileName);

	public List<Transaction> getDatabase();

	public List<Transaction> listToArchive();

}

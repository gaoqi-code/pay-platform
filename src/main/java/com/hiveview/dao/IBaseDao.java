package com.hiveview.dao;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBaseDao<T> {

	public Integer save(T t);

	public Integer delete(T t);

	public T get(T t);

	public List<T> getList(T t);

	public Integer update(T t);

	public int count(T t);
	
	public List<T> getPagin(T t);
	
	public Integer getCount(T t);
}
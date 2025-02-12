package com.example.adsboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.adsboard.entities.AdEntity;

@Repository
public interface AdRepository extends JpaRepository<AdEntity, Long> {
}

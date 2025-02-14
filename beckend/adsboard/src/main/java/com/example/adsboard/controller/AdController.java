package com.example.adsboard.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.adsboard.entities.AdEntity;
import com.example.adsboard.repository.AdRepository;

@RestController
@RequestMapping("/api")
public class AdController {

    private final AdRepository adRepository;
    private static final Logger log = LoggerFactory.getLogger(AdController.class);

    public AdController(AdRepository adRepository) {
        this.adRepository = adRepository;
    }

    @GetMapping("/ads")
    public ResponseEntity<List<AdEntity>> getAllAds() {
    try {
        List<AdEntity> ads = adRepository.findAll();
        return ResponseEntity.ok(ads); // 200 OK with the list of ads
    } catch (Exception e) {
        // Log the error (e.g., using SLF4j)
        log.error("Error fetching ads:", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500 Internal Server Error
    }
}

    @GetMapping("/ads/{id}")
    public AdEntity getAdById(@PathVariable Long id) {
        return adRepository.findById(id).orElseThrow(null); // Handle not found
    }

    @PostMapping("/ads")
    public AdEntity createAd(@RequestBody AdEntity ad) {
        return adRepository.save(ad);
    }

    @PutMapping("/ads/{id}")
    public AdEntity updateAd(@PathVariable Long id, @RequestBody AdEntity ad) {
        AdEntity existingAd = adRepository.findById(id).orElseThrow(null);
        existingAd.setTitle(ad.getTitle()); 
        existingAd.setDescription(ad.getDescription()); 
        existingAd.setPrice((ad.getPrice())); 
        existingAd.setImageUrl((ad.getImageUrl())); 
        existingAd.setUpdatedAt(ad.getUpdatedAt()); 
        return adRepository.save(existingAd);
    }
}
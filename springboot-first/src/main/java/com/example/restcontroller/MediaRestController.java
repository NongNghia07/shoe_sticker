package com.example.restcontroller;

import com.example.dto.MediaDTO;
import com.example.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/media")
public class MediaRestController {

    private final MediaService mediaService;

    @Autowired
    public MediaRestController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(this.mediaService.findAll());
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(this.mediaService.findById(id));
    }

    @GetMapping("/findAllByProductData_Id/{id}")
    public ResponseEntity<?> findAllByProductData_Id(@PathVariable("id") Integer product_data_id) {
        return ResponseEntity.ok().body(this.mediaService.findAllByProductDataID(product_data_id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody MediaDTO mediaDTO) {
        return ResponseEntity.ok().body(this.mediaService.create(mediaDTO));
    }

    @PostMapping("/createAll")
    public ResponseEntity<?> create(@RequestBody List<MediaDTO> mediaDTOS) {
        return ResponseEntity.ok().body(this.mediaService.createAll(mediaDTOS));
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody MediaDTO mediaDTO) {
        return ResponseEntity.ok().body(this.mediaService.update(mediaDTO));
    }

    @PutMapping("/updateAll")
    public ResponseEntity<?> updateAll(@RequestBody List<MediaDTO> mediaDTOS) {
        return ResponseEntity.ok().body(this.mediaService.updateAll(mediaDTOS));
    }

    @DeleteMapping("/delete/{id}")
    public void setStatusFalse(@PathVariable("id") Long id) {
        this.mediaService.setStatusFalse(id);
    }
}

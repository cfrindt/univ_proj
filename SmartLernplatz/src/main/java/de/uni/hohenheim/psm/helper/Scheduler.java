package de.uni.hohenheim.psm.helper;

import de.uni.hohenheim.psm.domain.Booking;
import de.uni.hohenheim.psm.service.BookingService;
import de.uni.hohenheim.psm.service.dto.BookingDTO;
import de.uni.hohenheim.psm.service.impl.BookingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Component
public class Scheduler {

    @Autowired
    BookingService bookingService;

    @Scheduled(fixedRate = 30000)
    public void checkPauseDuration() {

        List<BookingDTO> bookings = bookingService.findAll();
        bookings.forEach(booking -> {
            if(booking.isIsPaused()) {
                if(ChronoUnit.MINUTES.between(booking.getPauseStartStamp().toLocalTime(), LocalTime.now()) >= 30) {
                    bookingService.delete(booking.getId());
                }
            }
        });
    }
}

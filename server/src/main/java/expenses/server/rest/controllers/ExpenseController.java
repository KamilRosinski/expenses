package expenses.server.rest.controllers;

import expenses.server.rest.dto.MonthOverviewDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.YearMonth;
import java.util.Arrays;
import java.util.List;

@RestController()
@RequestMapping("/api/expense")
public class ExpenseController {

	@GetMapping("/all")
	public List<MonthOverviewDTO> getEvolutions() {
		return Arrays.asList(
				new MonthOverviewDTO(YearMonth.of(2020, 1), Integer.valueOf(100000), Integer.valueOf(210000)),
				new MonthOverviewDTO(YearMonth.of(2020, 2), Integer.valueOf(120000), Integer.valueOf(90000))
		);
	}

}

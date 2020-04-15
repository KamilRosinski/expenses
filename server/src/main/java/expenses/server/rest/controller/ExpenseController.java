package expenses.server.rest.controller;

import expenses.server.logic.ExpenseService;
import expenses.server.rest.dto.ExpenseDTO;
import expenses.server.rest.dto.MonthOverviewDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.YearMonth;
import java.util.List;

@RestController()
@RequestMapping("/api/expense")
@RequiredArgsConstructor
public class ExpenseController {

	private final ExpenseService expenseService;

	@GetMapping("/month-overview")
	public List<MonthOverviewDTO> getMonths() {
		return expenseService.getMonths();
	}

	@GetMapping
	public List<ExpenseDTO> getExpensesByMonth(@RequestParam final Integer year, @RequestParam final Integer month) {
		return expenseService.getExpensesByMonth(YearMonth.of(year.intValue(), month.intValue()));
	}

}

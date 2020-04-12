package expenses.server.rest.controller;

import expenses.server.logic.ExpenseService;
import expenses.server.rest.dto.ExpenseDTO;
import expenses.server.rest.dto.MonthOverviewDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.YearMonth;
import java.util.List;

@RestController()
@RequestMapping("/api/expense")
@RequiredArgsConstructor
public class ExpenseController {

	private final ExpenseService expenseService;

	@GetMapping("/months")
	public List<MonthOverviewDTO> getMonths() {
		return expenseService.getMonths();
	}

	@GetMapping("/year/{year}/month/{month}")
	public List<ExpenseDTO> getExpensesByMonth(@PathVariable final String year, @PathVariable final String month) {
		return expenseService.getExpensesByMonth(YearMonth.of(Integer.valueOf(year).intValue(), Integer.valueOf(month).intValue()));
	}

}

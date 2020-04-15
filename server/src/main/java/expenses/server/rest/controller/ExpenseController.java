package expenses.server.rest.controller;

import expenses.server.logic.ExpenseService;
import expenses.server.rest.dto.ExpenseDTO;
import expenses.server.rest.dto.MonthOverviewDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	public List<ExpenseDTO> getExpensesByYearAndMonth(@RequestParam final int year, @RequestParam final int month) {
		return expenseService.getExpensesByMonth(YearMonth.of(year, month));
	}

	@DeleteMapping("/{expenseId}")
	public void deleteExpenseById(@PathVariable final Long expenseId) {
		expenseService.deleteExpenseById(expenseId);
	}

}

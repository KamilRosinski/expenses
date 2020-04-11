package expenses.server.rest.controller;

import expenses.server.logic.ExpenseService;
import expenses.server.rest.dto.MonthOverviewDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}

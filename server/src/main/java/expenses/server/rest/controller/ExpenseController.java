package expenses.server.rest.controller;

import expenses.server.logic.ExpenseService;
import expenses.server.rest.dto.MonthDTO;
import expenses.server.rest.dto.MonthOverviewDTO;
import expenses.server.rest.dto.TransactionCreateDTO;
import expenses.server.rest.dto.TransactionDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.YearMonth;
import java.util.List;

@RestController()
@RequestMapping("/api")
@RequiredArgsConstructor
public class ExpenseController {

	private final ExpenseService expenseService;

	@GetMapping("/month/overview")
	public List<MonthOverviewDTO> getMonthOverviews() {
		return expenseService.getMonthOverviews();
	}

	@GetMapping("/month/{id}")
	public MonthDTO getMonthById(@PathVariable final Long id) {
		return expenseService.getMonthById(id);
	}

	@PostMapping("/month")
	public MonthDTO createMonth(@RequestBody final String yearMonth) {
		return expenseService.createMonth(YearMonth.parse(yearMonth));
	}

	@PostMapping("/transaction")
	public TransactionDTO createTransaction(@RequestBody final TransactionCreateDTO transactionCreate) {
		return expenseService.createTransaction(transactionCreate);
	}

}

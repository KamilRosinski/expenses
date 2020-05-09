package expenses.server.rest.controller;

import expenses.server.logic.ExpenseService;
import expenses.server.rest.dto.CategoryWithSubcategoriesDTO;
import expenses.server.rest.dto.MonthDTO;
import expenses.server.rest.dto.MonthOverviewDTO;
import expenses.server.rest.dto.PredictionDTO;
import expenses.server.rest.dto.TransactionDTO;
import expenses.server.rest.dto.YearMonthDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

	@PostMapping("/month/{monthId}/transaction")
	public TransactionDTO createTransaction(@PathVariable final Long monthId, @RequestBody final TransactionDTO transaction) {
		return expenseService.createTransaction(monthId, transaction);
	}

	@PostMapping("/month/{monthId}/prediction")
	public PredictionDTO createPrediction(@PathVariable final Long monthId, @RequestBody final PredictionDTO prediction) {
		return expenseService.createPrediction(monthId, prediction);
	}

	@GetMapping("/category")
	public List<CategoryWithSubcategoriesDTO> getCategoriesWithSubcategories() {
		return expenseService.getCategoriesWithSubcategories();
	}

	@PostMapping("/month")
	public MonthDTO createMonth(@RequestBody final YearMonthDTO yearMonth) {
		return expenseService.createMonth(yearMonth);
	}

}

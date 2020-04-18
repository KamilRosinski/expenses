package expenses.server.rest.controller;

import expenses.server.logic.AccountingPeriodService;
import expenses.server.rest.dto.AccountingPeriodDTO;
import expenses.server.rest.dto.AccountingPeriodOverviewDTO;
import expenses.server.rest.dto.TransactionCategoryDTO;
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
@RequestMapping("/api/accounting-period")
@RequiredArgsConstructor
public class AccountingPeriodController {

	private final AccountingPeriodService accountingPeriodService;

	@GetMapping("/overview")
	public List<AccountingPeriodOverviewDTO> getAccountingPeriodOverviews() {
		return accountingPeriodService.getOverviews();
	}

	@GetMapping("/{id}")
	public AccountingPeriodDTO getAccountingPeriodById(@PathVariable final Long id) {
		return accountingPeriodService.getById(id);
	}

	@PostMapping()
	public AccountingPeriodDTO createAccountingPeriodForYearMonth(@RequestBody final String yearMonth) {
		return accountingPeriodService.createForYearMonth(YearMonth.parse(yearMonth));
	}

	@PostMapping("/{accountingPeriodId}/transaction")
	public TransactionDTO createTransaction(@PathVariable final Long accountingPeriodId, @RequestBody final TransactionDTO transaction) {
		return accountingPeriodService.createTransaction(accountingPeriodId, transaction);
	}

	@GetMapping("/category/all")
	public List<TransactionCategoryDTO> getTransactionCategories() {
		return accountingPeriodService.getTransactionCategories();
	}

}

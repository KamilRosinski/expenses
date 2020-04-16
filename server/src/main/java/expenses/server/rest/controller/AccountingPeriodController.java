package expenses.server.rest.controller;

import expenses.server.logic.AccountingPeriodService;
import expenses.server.rest.dto.AccountingPeriodDTO;
import expenses.server.rest.dto.AccountingPeriodOverviewDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
		return accountingPeriodService.getAccountingPeriodById(id);
	}

}

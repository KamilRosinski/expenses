package expenses.server.logic.impl;

import expenses.server.logic.AccountingPeriodService;
import expenses.server.persistence.entity.AccountingPeriodEntity;
import expenses.server.persistence.repository.AccountingPeriodRepository;
import expenses.server.rest.dto.AccountingPeriodDTO;
import expenses.server.rest.dto.AccountingPeriodOverviewDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class AccountingPeriodServiceImpl implements AccountingPeriodService {

	private final AccountingPeriodRepository accountingPeriodRepository;

	@Override
	public List<AccountingPeriodOverviewDTO> getOverviews() {
		return accountingPeriodRepository.getIncomeAndOutcome().stream()
				.map(columns -> {
					final Long id = (Long) columns.get("id");
					final YearMonth yearMonth = YearMonth.of(
							((Integer) columns.get("year")).intValue(),
							((Integer) columns.get("month")).intValue()
					);
					final Long income = (Long) columns.get("income");
					final Long outcome = (Long) columns.get("outcome");
					return new AccountingPeriodOverviewDTO(id, yearMonth, income, outcome);
				})
				.collect(Collectors.toList());
	}

	@Override
	public AccountingPeriodDTO getById(final Long id) {
		return accountingPeriodRepository.findById(id).orElseThrow(
				() -> new NoSuchElementException("Accounting period with ID = " + id + " was not found.")).mapToDto();
	}

	@Override
	public AccountingPeriodDTO createForYearMonth(final YearMonth yearMonth) {
		return accountingPeriodRepository
				.save(new AccountingPeriodEntity(Integer.valueOf(yearMonth.getYear()), Integer.valueOf(yearMonth.getMonthValue())))
				.mapToDto();
	}

}

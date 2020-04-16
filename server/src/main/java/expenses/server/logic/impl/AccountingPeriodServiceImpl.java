package expenses.server.logic.impl;

import expenses.server.logic.AccountingPeriodService;
import expenses.server.persistence.repository.AccountingPeriodRepository;
import expenses.server.rest.dto.AccountingPeriodDTO;
import expenses.server.rest.dto.AccountingPeriodOverviewDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
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
					final LocalDate startDate = ((Date) columns.get("startDate")).toLocalDate();
					final LocalDate endDate = startDate.plusDays(((Long) columns.get("duration")).longValue() - 1);
					final Long income = (Long) columns.get("income");
					final Long outcome = (Long) columns.get("outcome");
					return new AccountingPeriodOverviewDTO(id, startDate, endDate, income, outcome);
				})
				.collect(Collectors.toList());
	}

	@Override
	public AccountingPeriodDTO getAccountingPeriodById(final Long id) {
		return accountingPeriodRepository.findById(id).orElseThrow(NoSuchElementException::new).mapToDto();
	}

}

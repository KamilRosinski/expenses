package expenses.server.logic.impl;

import expenses.server.logic.AccountingPeriodService;
import expenses.server.persistence.entity.AccountingPeriodEntity;
import expenses.server.persistence.entity.TransactionCategoryEntity;
import expenses.server.persistence.entity.TransactionEntity;
import expenses.server.persistence.repository.AccountingPeriodRepository;
import expenses.server.persistence.repository.TransactionCategoryRepository;
import expenses.server.persistence.repository.TransactionRepository;
import expenses.server.rest.dto.AccountingPeriodDTO;
import expenses.server.rest.dto.AccountingPeriodOverviewDTO;
import expenses.server.rest.dto.TransactionCategoryDTO;
import expenses.server.rest.dto.TransactionDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.YearMonth;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@Transactional
@RequiredArgsConstructor
public class AccountingPeriodServiceImpl implements AccountingPeriodService {

	private final AccountingPeriodRepository accountingPeriodRepository;

	private final TransactionRepository transactionRepository;

	private final TransactionCategoryRepository transactionCategoryRepository;

	@Override
	public List<AccountingPeriodOverviewDTO> getOverviews() {
		return accountingPeriodRepository.getIncomeAndOutcome().stream()
				.map(columns -> {
					final Long id = (Long) columns.get("id");
					final YearMonth yearMonth = YearMonth.of(
							((Integer) columns.get("year")).intValue(),
							((Integer) columns.get("month")).intValue()
					);
					final Long transactionCount = (Long) columns.get("transactionCount");
					final Long income = (Long) columns.get("income");
					final Long outcome = (Long) columns.get("outcome");
					return new AccountingPeriodOverviewDTO(id, yearMonth, transactionCount, income, outcome);
				})
				.collect(Collectors.toList());
	}

	@Override
	public AccountingPeriodDTO getById(final Long id) {
		return findAccountingPeriodById(id).mapToDto();
	}

	private AccountingPeriodEntity findAccountingPeriodById(Long id) {
		return accountingPeriodRepository.findById(id).orElseThrow(
				() -> new NoSuchElementException("Accounting period with ID = " + id + " was not found."));
	}

	@Override
	public AccountingPeriodDTO createForYearMonth(final YearMonth yearMonth) {
		return accountingPeriodRepository
				.save(new AccountingPeriodEntity(Integer.valueOf(yearMonth.getYear()), Integer.valueOf(yearMonth.getMonthValue())))
				.mapToDto();
	}

	@Override
	public TransactionDTO createTransaction(final Long accountingPeriodId, final TransactionDTO transaction) {

		final TransactionCategoryEntity category = transaction.getCategory().getId() != null
				? new TransactionCategoryEntity(transaction.getCategory().getId(), transaction.getCategory().getName())
				: transactionCategoryRepository.save(new TransactionCategoryEntity(transaction.getCategory().getName()));

		final TransactionEntity entity = new TransactionEntity(
				transaction.getDay(),
				transaction.getDescription(),
				transaction.getValue(),
				accountingPeriodId,
				category
		);

		return transactionRepository.save(entity).mapToDto();
	}

	@Override
	public List<TransactionCategoryDTO> getTransactionCategories() {
		return StreamSupport.stream(transactionCategoryRepository.findAll().spliterator(), false)
				.map(TransactionCategoryEntity::mapToDto)
				.collect(Collectors.toList());
	}

}

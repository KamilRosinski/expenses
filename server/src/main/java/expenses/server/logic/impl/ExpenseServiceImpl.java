package expenses.server.logic.impl;

import expenses.server.logic.ExpenseService;
import expenses.server.persistence.entity.CategoryEntity;
import expenses.server.persistence.entity.MonthEntity;
import expenses.server.persistence.entity.TransactionEntity;
import expenses.server.persistence.repository.CategoryRepository;
import expenses.server.persistence.repository.MonthRepository;
import expenses.server.persistence.repository.TransactionRepository;
import expenses.server.rest.dto.CategoryWithSubcategoriesDTO;
import expenses.server.rest.dto.MonthDTO;
import expenses.server.rest.dto.MonthOverviewDTO;
import expenses.server.rest.dto.TransactionDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.YearMonth;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

	private final MonthRepository monthRepository;

	private final TransactionRepository transactionRepository;

	private final CategoryRepository categoryRepository;

	@Override
	public List<MonthOverviewDTO> getMonthOverviews() {
		return monthRepository.getOverviews().stream()
				.map(columns -> {
					final Long id = (Long) columns.get("id");
					final YearMonth yearMonth = YearMonth.of(
							((Integer) columns.get("year")).intValue(),
							((Integer) columns.get("month")).intValue()
					);
					final Long transactionCount = (Long) columns.get("transactionCount");
					final Long income = (Long) columns.get("income");
					final Long outcome = (Long) columns.get("outcome");
					return new MonthOverviewDTO(id, yearMonth, transactionCount, income, outcome);
				})
				.collect(Collectors.toList());
	}

	@Override
	public MonthDTO getMonthById(final Long id) {
		return monthRepository.findById(id)
				.orElseThrow(() -> new NoSuchElementException("Month with ID = " + id + " was not found."))
				.mapToDto();
	}

	@Override
	public MonthDTO createMonth(final YearMonth yearMonth) {
		return monthRepository
				.save(new MonthEntity(Integer.valueOf(yearMonth.getYear()), Integer.valueOf(yearMonth.getMonthValue())))
				.mapToDto();
	}

	@Override
	public List<CategoryWithSubcategoriesDTO> getCategoriesWithSubcategories() {
		return categoryRepository.getAllCategories().stream()
				.map(CategoryEntity::mapToDtoWithSubcategories)
				.collect(Collectors.toList());
	}

	@Override
	public TransactionDTO createTransaction(final Long monthId, final TransactionDTO transaction) {
		final MonthEntity month = monthRepository.getOne(monthId);
		return transactionRepository.save(new TransactionEntity(transaction, month)).mapToDto();
	}

}

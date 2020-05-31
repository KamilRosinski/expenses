package expenses.server.logic.impl;

import expenses.server.logic.ExpenseService;
import expenses.server.persistence.entity.CategoryEntity;
import expenses.server.persistence.entity.MonthEntity;
import expenses.server.persistence.entity.PredictionEntity;
import expenses.server.persistence.entity.TransactionEntity;
import expenses.server.persistence.repository.CategoryRepository;
import expenses.server.persistence.repository.MonthRepository;
import expenses.server.persistence.repository.PredictionRepository;
import expenses.server.persistence.repository.TransactionRepository;
import expenses.server.rest.dto.CategoryDTO;
import expenses.server.rest.dto.CategoryWithSubcategoriesDTO;
import expenses.server.rest.dto.MonthDTO;
import expenses.server.rest.dto.MonthOverviewDTO;
import expenses.server.rest.dto.PredictionDTO;
import expenses.server.rest.dto.TransactionDTO;
import expenses.server.rest.dto.YearMonthDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

	private final MonthRepository monthRepository;
	private final TransactionRepository transactionRepository;
	private final PredictionRepository predictionRepository;
	private final CategoryRepository categoryRepository;

	@Override
	public List<MonthOverviewDTO> getMonthOverviews() {
		return monthRepository.getOverviews().stream()
				.map(columns -> {
					final Long id = (Long) columns.get("id");
					final Integer year = (Integer) columns.get("year");
					final Integer month = (Integer) columns.get("month");
					final Long transactionCount = (Long) columns.get("transactionCount");
					final Long income = (Long) columns.get("income");
					final Long outcome = (Long) columns.get("outcome");
					return new MonthOverviewDTO(id, year, month, transactionCount, income, outcome);
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
	public MonthDTO createMonth(final YearMonthDTO yearMonth) {
		return monthRepository
				.save(new MonthEntity(yearMonth.getYear(), yearMonth.getMonth()))
				.mapToDto();
	}

	@Override
	public List<CategoryDTO> getCategories() {
		return categoryRepository.findAll().stream()
				.map(CategoryEntity::mapToDto)
				.collect(Collectors.toList());
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

	@Override
	public PredictionDTO createPrediction(final Long monthId, final PredictionDTO prediction) {

		final MonthEntity month = monthRepository.getOne(monthId);
		final CategoryEntity category = prediction.getCategory().getId() != null
				? new CategoryEntity(prediction.getCategory())
				: categoryRepository.save(new CategoryEntity(prediction.getCategory()));

		return predictionRepository.save(new PredictionEntity(prediction, month, category)).mapToDTO();
	}

}
